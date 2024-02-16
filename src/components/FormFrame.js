import React, { useEffect, useState } from 'react'
import '../assets/styles/FormFrame.css'

const FormFrame = ({ formData }) => {
	const [formFields, setFormFields] = useState(formData)
	const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
	const [formDataValues, setFormDataValues] = useState({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleNextField = () => {
		const currentField = formFields[currentFieldIndex]

		if (currentField.required) {
			switch (currentField.type) {
				case 'text':
					if (
						!formDataValues[currentField.name] ||
						formDataValues[currentField.name].trim() === ''
					) {
						alert(`${currentField.label} is required`)
						return
					}
					break
				case 'email':
					if (
						!formDataValues[currentField.name] ||
						formDataValues[currentField.name].trim() === '' ||
						!validateEmail(formDataValues[currentField.name])
					) {
						alert(`${currentField.label} is required`)
						return
					}
					break
				case 'radio':
				case 'select':
					if (!formDataValues[currentField.name]) {
						alert(`${currentField.label} is required`)
						return
					}
					break
				case 'checkbox':
					if (
						!formDataValues[currentField.name] ||
						formDataValues[currentField.name].length === 0
					) {
						alert(`${currentField.label} is required`)
						return
					}
					break
				default:
					break
			}
		}
		setCurrentFieldIndex(currentFieldIndex + 1)
	}

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailPattern.test(email)
	}

	const handleInputChange = (event) => {
		const fieldName = event.target.name
		const fieldValue = event.target.value
		setFormDataValues({ ...formDataValues, [fieldName]: fieldValue })
	}

	const handleRadioChange = (event) => {
		const fieldName = event.target.name
		const fieldValue = event.target.value
		setFormDataValues({ ...formDataValues, [fieldName]: fieldValue })
	}

	const handleCheckboxChange = (event) => {
		const fieldName = event.target.name
		const fieldValue = event.target.checked
		setFormDataValues({ ...formDataValues, [fieldName]: fieldValue })
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		setIsSubmitted(true)
		window.parent.postMessage(
			{ type: 'formSubmissionResult', data: formDataValues },
			'*'
		)
	}

	const renderFormField = (field, index) => {
		switch (field.type) {
			case 'text':
				return (
					<div key={index} className={`form-field`}>
						<input
							type='text'
							name={field.name}
							placeholder={field.placeholder}
							onChange={handleInputChange}
							autoFocus={true}
							required
						/>
						<span
							style={{
								marginLeft: '10px',
								fontSize: '40px',
								fontWeight: '900',
								paddingBottom: '5px',
								cursor: 'pointer'
							}}
							title='Next'
							onClick={handleNextField}
						>
							-&gt;
						</span>
					</div>
				)
			case 'email':
				return (
					<div key={index} className={`form-field`}>
						<input
							type='email'
							name={field.name}
							placeholder={field.placeholder}
							onChange={handleInputChange}
							autoFocus={true}
						/>
						<span
							style={{
								marginLeft: '10px',
								fontSize: '40px',
								fontWeight: '900',
								paddingBottom: '5px',
								cursor: 'pointer'
							}}
							title='Next'
							onClick={handleNextField}
						>
							-&gt;
						</span>
					</div>
				)
			case 'radio':
				return (
					<div key={index} className={`form-field`}>
						<span
							style={{
								marginRight: '10px',
								fontSize: '18px',
								fontWeight: '600'
							}}
						>
							{field.label}
						</span>
						{field.options.map((option, optionIndex) => (
							<div key={optionIndex}>
								<input
									type='radio'
									name={field.name}
									value={option}
									onChange={handleRadioChange}
								/>
								<label>{option}</label>
							</div>
						))}
						<span
							style={{
								marginLeft: '10px',
								fontSize: '40px',
								fontWeight: '900',
								paddingBottom: '5px',
								cursor: 'pointer'
							}}
							title='Next'
							onClick={handleNextField}
						>
							-&gt;
						</span>
					</div>
				)
			case 'select':
				return (
					<div key={index} className={`form-field`}>
						<span
							style={{
								marginRight: '10px',
								fontSize: '18px',
								fontWeight: '600'
							}}
						>
							{field.label}
						</span>
						<select name={field.name} onChange={handleInputChange}>
							<option value=''>Select...</option>
							{field.options.map((option, optionIndex) => (
								<option key={optionIndex} value={option}>
									{option}
								</option>
							))}
						</select>
						<span
							style={{
								marginLeft: '10px',
								fontSize: '40px',
								fontWeight: '900',
								paddingBottom: '5px',
								cursor: 'pointer'
							}}
							title='Next'
							onClick={handleNextField}
						>
							-&gt;
						</span>
					</div>
				)
			case 'checkbox':
				return (
					<div key={index} className={`form-field`}>
						<div className=''>
							<input
								type='checkbox'
								name={field.name}
								defaultChecked={field.checked}
								onChange={handleCheckboxChange}
							/>
						</div>
						<span>{field?.label}</span>
					</div>
				)
			default:
				return null
		}
	}

	useEffect(() => {
		if (formData) {
			setFormFields(formData)
		}
	}, [formData])

	if (isSubmitted) {
		return <div className='success-message'>Thank you for your submission!</div>
	}

	return (
		<div className='FormFrame'>
			<form onSubmit={handleFormSubmit}>
				{formFields &&
					formFields.length > 0 &&
					renderFormField(formFields[currentFieldIndex], currentFieldIndex)}
				<button
					type='submit'
					disabled={currentFieldIndex !== formFields?.length - 1}
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default FormFrame
