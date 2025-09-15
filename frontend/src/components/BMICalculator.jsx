import React, { useState } from 'react'

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
  };
  return (
    <div>BMICalculator</div>
  )
}

export default BMICalculator