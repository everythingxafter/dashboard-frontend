import { useState } from "react";

function Home() {
    const [formattedNumber, setFormattedNumber] = useState("");


    const formatNumber = (value) => {
        // Remove any non-digit characters
        const numericValue = value.replace(/\D/g, "");

        // Format the number with dot separators every three digits
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Update the state with the formatted value
        setFormattedNumber(formattedValue);
    };

    const handleChange = (event) => {
        formatNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const hargaInput = event.target.harga;
        const hargaValue = hargaInput.value.replace(/\./g, "");

        // Log the form data or do any other processing here
        console.log("Form submitted!");

        // If you want to access form field values, you can do it like this:
        const konsumen = event.target.konsumen.value;
        const gudang = event.target.gudang.value;
        const kebun = event.target.kebun.value;
        const keterangan = event.target.keterangan.value;

        console.log("Nama Konsumen:", konsumen);
        console.log("Alamat Gudang:", gudang);
        console.log("Alamat Kebun:", kebun);
        console.log("Harga:", hargaValue);
        console.log("Keterangan:", keterangan);
    };


    return (
        <section className="flex flex-col">
            <div className="px-5 bg-white rounded-lg shadow-md w-2/4 mx-auto mt-10">
                <div className="text-center text-xl font-semibold py-3 border-b-slate-300 border-b-2 mb-4 mt-2">
                    <p>Tambah Konsumen</p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="konsumen">Nama Konsumen :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="konsumen" type="text" placeholder="Isi Nama Konsumen..." />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="gudang">Alamat Gudang :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gudang" type="text" placeholder="Isi Alamat Gudang..." />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="kebun">Alamat Kebun :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="kebun" type="text" placeholder="Isi Alamat Kebun..." />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="harga">Harga :</label>
                        <input value={formattedNumber}
                            onChange={handleChange} className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="harga" type="text" placeholder="Isi Harga..." />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="kebun">Keterangan :</label>
                        <input className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="keterangan" type="text" placeholder="Isi Keterangan..." />
                    </div>
                    <div className="flex justify-end p-4 mb-4">
                        <button type="submit" className="py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:shadow-md">Tambah Data Konsumen</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Home