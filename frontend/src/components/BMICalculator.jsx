import React, { useState } from 'react'
import {toast} from 'react-toastify';

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [gender, setGender] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if(!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender");
      return;
    }
    const heightInMeters = height/100;
    const bmiValue = (weight/(heightInMeters*heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if(bmiValue < 18.5) {
      toast.warning("you are underweight. Consider seeking advice from a healthcare provider");
    } else if(bmiValue >= 18.5 && bmiValue < 24.9) {
      toast.success("You have a normal weight. Keep maintaining the healthy lifestyle");
    } else if(bmiValue >= 25 && bmiValue < 29.9) {
      toast.warning("You are overweight. consider seeking advice from a healthcare provider");
    } else {
      toast.error("You are in the obese range. It is recommended to seek advice from a healthcare specialist");
    }
  };
  return (
    <section className='bmi'>
      <h1>BMI CALCULATOR</h1>
      <div className="container">
        <div className="wrapper">
          <form action="" onSubmit={calculateBMI}>
            <div>
              <label htmlFor="" >Height(cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="" >Weight(kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type='submit'>Calculate BMI</button>
          </form>
        </div>
        <div className="wrapper">
          <img src="/bmi.jpg" alt="bmiImg" />
        </div>
      </div>
    </section>
  )
}

export default BMICalculator