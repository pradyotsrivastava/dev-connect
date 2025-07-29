import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Loader";

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

const EditProject = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillInput, setSkillInput] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!projectId) {
      toast.error("Project ID is missing");
      navigate("/my-projects");
      return;
    }

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/projects/get-project/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setInitialValues({
          title: data.title || "",
          description: data.description || "",
          link: data.link || "",
          category: data.category || "",
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          skills: Array.isArray(data.skills) ? data.skills : [],
        });

        setLoading(false);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch project details"
        );
        navigate("/my-projects");
      }
    };

    fetchProject();
  }, [projectId, token, navigate]);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/projects/update-project/${projectId}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data?.message || "Project updated successfully");
      navigate("/my-projects");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update project");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) return <Loader count={6} type="card" />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium mb-1" htmlFor="title">
                Title <span className="text-red-600">*</span>
              </label>
              <Field name="title" className="w-full border px-3 py-2 rounded" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1" htmlFor="description">
                Description <span className="text-red-600">*</span>
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block font-medium mb-1" htmlFor="link">
                Link (optional)
              </label>
              <Field
                name="link"
                type="url"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="link"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium mb-1" htmlFor="category">
                Category <span className="text-red-600">*</span>
              </label>
              <Field
                as="select"
                name="category"
                className="w-full border px-3 py-2 rounded"
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
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-medium mb-1" htmlFor="startDate">
                Start Date
              </label>
              <Field
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
            <div>
              <label className="block font-medium mb-1" htmlFor="endDate">
                End Date
              </label>
              <Field
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
            <div>
              <label className="block font-medium mb-1" htmlFor="skills">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProject;
