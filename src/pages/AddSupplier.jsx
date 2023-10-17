import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";

function AddSupplier() {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierService: '',
        destination: '',
        price: '',
        createBy: '',
        keterangan: '',
    });

    const navigate = useNavigate();

    const formatPriceDisplay = (price) => {
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatPriceForPost = (price) => {
        return price.replace(/\./g, "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['supplierName', 'supplierService', 'destination', 'price'];
        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

        const token = localStorage.getItem('Authorization')
        const decodedToken = jwt_decode(token);
        const username = decodedToken.name;

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

        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Supplier Name :</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${formData.supplierName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Supplier Service :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.supplierService}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Alamat Tujuan :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.destination}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Price :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.price}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Keterangan :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.keterangan}</td>
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
                    const token = localStorage.getItem('Authorization');

                    if (!token) {
                        console.error('No token found. Please log in.');
                        return;
                    }

                    const decodedToken = jwt_decode(token);
                    const username = decodedToken.name;

                    const updatedFormData = {
                        ...formData,
                        createBy: username,
                        price: formatPriceForPost(formData.price)
                    };
                    setFormData(updatedFormData);

                    const response = await axios.post('http://localhost:3000/suppliers/create', formData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data added successfully!',
                    }).then(() => {
                        navigate('/listsupplier');
                    })
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
        const username = decodedToken.name;

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
                    <p>Tambah Supplier</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="supplierName">Nama Supplier :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} placeholder="Supplier Name" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="supplierService">Service:</label>
                        <select
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="supplierService"
                            value={formData.supplierService}
                            onChange={handleChange}
                        >
                            <option value="">Select a Supplier Service</option>
                            <option value="PBM Bongkar">PBM Bongkar</option>
                            <option value="PBM Muat">PBM Muat</option>
                            <option value="Trucking">Trucking</option>
                            <option value="Kapal">Kapal</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="destination">Alamat Tujuan :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Alamat Tujuan" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="price">Price :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="price" value={formatPriceDisplay(formData.price)} onChange={handlePriceChange} placeholder="Harga Supplier" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="keterangan">Keterangan :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="keterangan" value={formData.keterangan} onChange={handleChange} placeholder="Keterangan" />
                    </div>
                    <div className="flex my-8 justify-end">
                        <button type="submit" className="py-2 px-3 bg-green-700 text-white rounded-lg shadow-xl hover:bg-green-900">Submit</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default AddSupplier