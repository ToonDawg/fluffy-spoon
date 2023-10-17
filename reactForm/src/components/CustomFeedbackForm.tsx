import { useForm } from "../hooks/useForm";

type FormValues = {
  name: string,
  rating?: number,
  service?: 'Development' | 'Test' | 'Deployment'
}

const validationFn = ( values: FormValues) => {
  const output = [];
  if(!values.name.length) output.push('Name is Required.');
  if(!values.rating) output.push('Rating is required.');
  if(!values.service) output.push('Service is required.');
  return output;
}

export const CustomFeedbackForm = () => {

  const form = useForm<FormValues>({name: ''}, validationFn)


  return (
    <div className="formContainer">
      <h2>Custom Feedback Form</h2>
      {form.errors && form.errors.map((error: string) => <p>{error}</p>)}
      <form className="form" onSubmit={form.onSubmit}>
        <div>
          <label>Name: </label>
          <input placeholder="Name" value={form.values.name} onChange={form.onChange} type="text" name="name" />
        </div>
        <div>
          <label>Rating: </label>
          <input name="rating" value={1} type="radio" onChange={form.onChange} />1
          <input name="rating" value={2} type="radio" onChange={form.onChange} />2
          <input name="rating" value={3} type="radio" onChange={form.onChange} />3
          <input name="rating" value={4} type="radio" onChange={form.onChange} />4
          <input name="rating" value={5} type="radio" onChange={form.onChange} />5
        </div>
        <div>
          <label>Service</label>
          <select title="Service" name="service" defaultValue={""} value={form.values.service} onChange={form.onChange}>
            <option value="" disabled hidden>
              Select a service
            </option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Deployment">Deployment</option>
          </select>
        </div>
        <button type="submit" disabled={form.isSubmitting}>Submit</button>
      </form>
    </div>
  );
};

