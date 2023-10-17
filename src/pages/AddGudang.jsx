import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";

function AddGudang() {
    const [formData, setFormData] = useState({
        warehouseName: '',
        factoryName: '',
        warehouseAddress: '',
        contactPersonName: '',
        contactPersonNumber: '',
        createBy: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['warehouseName', 'factoryName', 'warehouseAddress', 'contactPersonName', 'contactPersonNumber'];
        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

        const token = localStorage.getItem('Authorization')
        const decodedToken = jwt_decode(token);
        const username = decodedToken.name;

        const updatedFormData = {
            ...formData,
            createBy: username,
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
          <th style="text-align: right;min-width: 100%;">Nama Gudang :</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${formData.warehouseName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Nama Pabrik :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.factoryName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Alamat Gudang :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.warehouseAddress}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Contact Person :</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.contactPersonName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Nomer Telfon:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${formData.contactPersonNumber}</td>
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
                    };
                    setFormData(updatedFormData);

                    const response = await axios.post('http://localhost:3000/warehouses/create', formData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data added successfully!',
                    }).then(() => {
                        navigate('/listgudang');
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        const token = localStorage.getItem('Authorization')
        const decodedToken = jwt_decode(token);
        const username = decodedToken.name;

        const updatedFormData = {
            ...formData,
            createBy: username,
            [name]: value,
        };
        setFormData(updatedFormData);
    };

    return (
        <section className="flex flex-col">
            <div className="px-5 bg-white rounded-lg shadow-md w-2/4 mx-auto mt-10">
                <div className="text-center text-xl font-semibold py-3 border-b-slate-300 border-b-2 mb-4 mt-2">
                    <p>Tambah Gudang</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="warehouseName">Nama Gudang :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="warehouseName" value={formData.warehouseName} onChange={handleChange} placeholder="Warehouse Name" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="name">Nama Pabrik :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="factoryName" value={formData.factoryName} onChange={handleChange} placeholder="Factory Name" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="warehouseAddress">Alamat Gudang :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="warehouseAddress" value={formData.warehouseAddress} onChange={handleChange} placeholder="Alamat Gudang" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="contactPersonName">Contact Person :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} placeholder="Nama Contact Person" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="contactPersonNumber">Nomer Telfon :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="contactPersonNumber" value={formData.contactPersonNumber} onChange={handleChange} placeholder="Nomer Telfon" />
                    </div>
                    <div className="flex my-8 justify-end">
                        <button type="submit" className="py-2 px-3 bg-green-700 text-white rounded-lg shadow-xl hover:bg-green-900">Submit</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default AddGudang