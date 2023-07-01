import { useMutation } from "react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/contact.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Your Email"),
  message: Yup.string().required("Please Enter Your Message"),
});

const sendEmail = async ({ email, message }) => {
  try {
    const { data } = await axios.post(
      "https://final-touch-back.onrender.com/api/send-email",
      {
        email,
        message,
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ContactForm = () => {
  const { getFieldProps, errors, touched, handleSubmit, resetForm } = useFormik(
    {
      initialValues: {
        email: "",
        message: "",
      },
      validationSchema,
      async onSubmit(values) {
        await mutate(values);
        resetForm();
      },
    }
  );

  const { mutate, isLoading } = useMutation(sendEmail, {
    onSuccess: () => {
      toast.success(
        "Your Message was sent successfully wait for my response soon",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    },
    onError: () => {
      toast.error("Sorry try again later", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  return (
    <section
      className="contact min-h-screen py-8 flex justify-center items-center flex-col overflow-hidden"
      id="contact-us"
    >
      <h1 className="text-center min-[290px]:text-[1.3rem] md:text-7xl mb-12 dark:text-[#1f1f29]">
        LET&apos;S KEEP IN TOUCH
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-start flex-col min-[290px]:w-[90%] md:w-[50%]"
      >
        <label className="text-3xl dark:text-[#1f1f29]" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...getFieldProps("email")}
          autoComplete="none"
          className="py-4 pl-4"
        />
        {errors.email && touched.email && (
          <div className="dark:text-[#1f1f29]">{errors.email}</div>
        )}
        <label className="mt-6 text-3xl dark:text-[#1f1f29]" htmlFor="message">
          Message:
        </label>
        <textarea
          id="message"
          {...getFieldProps("message")}
          autoComplete="none"
          className="py-4 pl-4"
        />
        {errors.message && touched.message && (
          <div className="dark:text-[#1f1f29]">{errors.message}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="md:pl-2 md:pr-12 min-[290px]:pl-0 min-[290px]:pr-0 min-[290px]:w-full md:w-fit min-[290px]:py-2 text-3xl min-[290px]:text-[#1f1f29] min-[290px]:bg-[#ffed00] md:text-[#f5f5fa] md:bg-[#1f1f29] rounded-md mt-8"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default ContactForm;
