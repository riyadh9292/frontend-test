import React, { useEffect, useState } from 'react'
import FormFrame from './FormFrame'
import '../assets/styles/ParentPage.css'

const ParentPage = () => {
	const [formData, setFormData] = useState(null)

	useEffect(() => {
		const currentUrl = window.location.href
		const searchParams = new URLSearchParams(currentUrl.split('?')[1])
		const formDataString = searchParams.get('formData')
		const formDataObject = JSON.parse(formDataString)
		if (formDataObject?.fields) {
			setFormData(formDataObject.fields)
		} else {
			setFormData([])
		}
	}, [])

	return (
		<div className='ParentPage'>
			<header>
				<h1>Styled Form with API Integration</h1>
			</header>
			<div className='formContainer'>
				<FormFrame formData={formData} />
			</div>
		</div>
	)
}

export default ParentPage
