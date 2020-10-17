//not inuse at the moment due to problem in pass regex
import * as Yup from "yup";

const TodoFormValidation = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  description: Yup.string().label("description").nullable()
});

export default TodoFormValidation;
