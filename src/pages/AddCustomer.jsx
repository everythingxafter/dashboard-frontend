import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function AddCustomer() {
    const [formData, setFormData] = useState({
        customerName: '',
        name: '',
        estate: '',
        region: '',
        price: '',
        service: '',
        createBy: '',
        keterangan: '',
    });

    const formatPriceDisplay = (price) => {
        // Format price with dot separator
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatPriceForPost = (price) => {
        // Remove dot separator before posting
        return price.replace(/\./g, "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required fields are empty
        const requiredFields = ['customerName', 'name', 'estate', 'region', 'price', 'service'];
        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

        const token = localStorage.getItem('Authorization')
        const decodedToken = jwt_decode(token);
        const username = decodedToken.name; // Extract username from the token

        const updatedFormData = {
            ...formData,
            createBy: username,
            price: formatPriceForPost(formData.price)
        };
        setFormData(updatedFormData);

        if (emptyFields.length > 0) {
            console.error('Please fill in all required fields:', emptyFields.join(', '));
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Please fill in all required fields: ${emptyFields.join(', ')}`,
            });
            return;
        }

        // Construct a preview of the data
        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Customer Name:</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${formData.customerName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Name:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.name}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Estate:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.estate}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Region:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.region}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Price:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.price}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Service:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.service}</td>
        </tr>
        <tr style="width: 100%;">
        <th style="text-align: right; min-width: 100%;">create:</th>
        <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.createBy}</td>
      </tr>
      </table>
      </div>
        `;

        Swal.fire({
            icon: 'question',
            title: 'Please review the data',
            html: dataPreview,
            confirmButtonText: 'Submit',
            showCancelButton: true,
        }).then(async (confirmResult) => {
            if (confirmResult.isConfirmed) {
                try {
                    const token = localStorage.getItem('Authorization'); // Get the token from localStorage

                    if (!token) {
                        console.error('No token found. Please log in.');
                        return;
                    }

                    const decodedToken = jwt_decode(token);
                    const username = decodedToken.name; // Extract username from the token

                    const updatedFormData = {
                        ...formData,
                        createBy: username,
                        price: formatPriceForPost(formData.price)
                    };
                    setFormData(updatedFormData);

                    const response = await axios.post('http://localhost:3000/customers/create', formData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data added successfully!',
                    });

                    console.log('Data added successfully:', response.data.customer);
                } catch (error) {
                    console.error('Error adding data:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to add data. Please try again.',
                    });
                }
            }
        });
    };

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;
        // Allow only numeric characters and backspace
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setFormData({
            ...formData,
            price: numericValue
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const token = localStorage.getItem('Authorization')
        const decodedToken = jwt_decode(token);
        const username = decodedToken.name; // Extract username from the token

        const updatedFormData = {
            ...formData,
            createBy: username,
            price: formatPriceForPost(formData.price),
            [name]: value,
        };
        setFormData(updatedFormData);
    };

    return (
        <section className="flex flex-col">
            <div className="px-5 bg-white rounded-lg shadow-md w-2/4 mx-auto mt-10">
                <div className="text-center text-xl font-semibold py-3 border-b-slate-300 border-b-2 mb-4 mt-2">
                    <p>Tambah Konsumen</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="customerName">Nama Konsumen :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="name">Nama :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama PT." />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="estate">Estate :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="estate" value={formData.estate} onChange={handleChange} placeholder="Nama Estate" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="region">Region :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Region" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="price">Price / Ton :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="price" value={formatPriceDisplay(formData.price)} onChange={handlePriceChange} placeholder="Harga Per Ton" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="service">Service:</label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                        >
                            <option value="">Select a service</option>
                            <option value="Port to Port">Port to Port</option>
                            <option value="Door to Door">Door to Door</option>
                            <option value="Port to Door">Port to Door</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="keterangan">Keterangan :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="keterangan" value={formData.keterangan} onChange={handleChange} placeholder="Keterangan" />
                    </div>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </section>
    )
}

export default AddCustomer