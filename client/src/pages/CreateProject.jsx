import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const categories = [
  "Front End",
  "Back End",
  "Full Stack",
  "Data Analyst",
  "Business Analyst",
  "Data Science",
  "AI/ML",
  "Mobile Development",
  "DevOps",
  "UI/UX Design",
  "QA Testing",
];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  link: Yup.string().url("Invalid URL").nullable(),
  category: Yup.string().required("Category is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End date can't be before start date"),
  skills: Yup.array().min(1, "At least one skill is required"),
});

const CreateProject = () => {
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState("");

  const initialValues = {
    title: "",
    description: "",
    link: "",
    category: "",
    startDate: "",
    endDate: "",
    skills: [],
  };

  const handleSkillAdd = (skills, setFieldValue) => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setFieldValue("skills", [...skills, trimmed]);
    }
    setSkillInput("");
  };

  const handleSkillRemove = (skills, setFieldValue, skillToRemove) => {
    setFieldValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const payload = {
        ...values,
        skills: values.skills,
      };

      await axios.post(`${BASE_URL}/api/projects/create-project`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Project created successfully!");
      navigate("/my-projects");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md lg:max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* Title */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="title">
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Project title"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="description">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Project description"
                className="w-full border px-3 py-2 rounded"
                rows="4"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Link */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="link">
                Link (optional)
              </label>
              <Field
                id="link"
                name="link"
                placeholder="Project link"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="link"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="category">
                Category
              </label>
              <div className="border rounded overflow-y-auto max-h-[200px]">
                <Field
                  as="select"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  className="w-full p-2 border-none focus:outline-none"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
              </div>

              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="startDate">
                Start Date
              </label>
              <Field
                id="startDate"
                name="startDate"
                type="date"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="endDate">
                End Date
              </label>
              <Field
                id="endDate"
                name="endDate"
                type="date"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="skills">
                Skills
              </label>

              <div className="flex flex-wrap gap-2 mb-2">
                {values.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        handleSkillRemove(values.skills, setFieldValue, skill)
                      }
                      className="ml-2 text-blue-800 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSkillAdd(values.skills, setFieldValue);
                  }
                }}
                placeholder="Type skill and press Enter"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="skills"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProject;
