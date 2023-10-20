import { FormEvent } from "react";

export const B2CLogin = () => {
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(event)
    }

  return (
    <div className="container">
      <h1>B2C Login</h1>
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" required />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" required/>
        </div>
        <div className="form-input">
          <label htmlFor="password">Email: </label>
          <input type="email" id="email" required/>
        </div>
        <button type="submit">Submit</button>
        {import.meta.env.VITE_TEST_VAR}
      </form>
    </div>
  );
};
