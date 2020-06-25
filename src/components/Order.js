import React, { useState } from 'react';


export default function () {
    const allMedicine = ["aspiryna", "ibuprom", "acatar"];
    const allWard = ["ratunkowy", "zakaźny", "okulistyczny"]
    const allTimeMedicine = ["08:00", "15:00", "18:00"];
    const today = new Date();
    const currentDateDay = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
        + '-' + ('0' + today.getDate()).slice(-2);
    const macDateMedicine = (today.getFullYear() + 1) + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
        + '-' + ('0' + today.getDate()).slice(-2);
    const [medicine, setMedicine] = useState("aspiryna")
    const [timeMedicine, setTimeMedicine] = useState("08:00")
    const [date, setDate] = useState(currentDateDay)
    const [ward, setWard] = useState("ratunkowy")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [quantity, setQuantity] = useState("1")
    const [perIdNum, setPerIdNum] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorSurname, setErrorSurname] = useState("");
    const [errorYear, setErrorYear] = useState("");
    const [errorQuantity, setErrorQuantity] = useState("");
    const [errorPesel, setErrorPesel] = useState("");
    const [success, setSuccess] = useState("");
    const styleError = (typeError) => {
        let style;
        if (typeError) {
            return (style = {
                border: "1px solid red"
            })
        }
    }
    const numbers = /^[0-9]+$/;
    const only_letters=/^[A-Za-z]+$/

    const handleForm = (event) => {
        setErrorSurname("");
        setErrorName("");
        setErrorYear("")
        setErrorPesel("");
        setErrorQuantity("");
        setSuccess("");
        const errors = [];
        event.preventDefault();
        if (+date.slice(0, 4) < today.getFullYear() || +date.slice(0, 4) > (today.getFullYear() + 1)) {
            console.log("error year")
            setErrorYear("rok zbyt odległy")
            errors.push(date)
        }
        if (name.trim().length < 3 || !only_letters.test(name)) {
            console.log("error name")
            setErrorName("Imię za krótkię bądź zawiera liczby")
            errors.push(name)
        }
        if (surname.trim().length < 3 || !only_letters.test(surname)) {
            console.log("error surname")
            setErrorSurname("nazwisko za krótkie bądź zawiera liczby")
            errors.push(surname)
        }
        if (+quantity < 1 || !numbers.test(quantity)) {
            console.log("error quantity")
            setErrorQuantity("ilość za mała bądź zawiera różne od liczb znaki")
            errors.push(quantity)
        }
        if (!numbers.test(perIdNum)) {
            console.log("error pesel")
            setErrorPesel("pesel zawiera różne od liczb znaki");
            errors.push(perIdNum)
        }
        if (errors.length === 0) { setSuccess("zrealizowane") }
    }
    return (
        <form onSubmit={handleForm}>
            <h1>Zlecenie lekowe<br></br>{success}</h1>
            <label htmlFor="name" >Imię:{errorName}</label>
            <input className="field" type="text" style={styleError(errorName)} id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
            <label htmlFor="surname" >Nazwisko:{errorSurname}</label>
            <input className="field" type="text" style={styleError(errorSurname)} id="surname" name="surname" value={surname} onChange={(event) => setSurname(event.target.value)} />
            <label htmlFor="perIdNum">Pesel:{errorPesel}</label>
            <input className="field" type="text" maxLength="11" style={styleError(errorPesel)} minLength="11" id="perIdNum" name="perIdNum" value={perIdNum} onChange={(event) => setPerIdNum(event.target.value)} />
            <label htmlFor="medicine">Wybierz lek:</label>
            <select className="field" name="medicine" id="medicine" value={medicine} onChange={(event) => setMedicine(event.target.value)}>
                {allMedicine.map((medicine, index) => {
                    return <option key={index}>{medicine}</option>
                })}
            </select>
            <label htmlFor="timeOfMedicine">Wybierz porę podania leku:</label>
            <select className="field" name="timeOfMedicine" id="timeOfMedicine" value={timeMedicine} onChange={(event) => setTimeMedicine(event.target.value)}>
                {allTimeMedicine.map((timeOfMedicine, index) => {
                    return <option key={index}>{timeOfMedicine}</option>
                })}
            </select>
            <label htmlFor="quantity">Ilość:{errorQuantity}</label>
            <input className="field" style={styleError(errorQuantity)} type="text" maxLength="3" id="quantity" name="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <label htmlFor="start">Data podania leku:{errorYear}</label>
            <input className="field" type="date" style={styleError(errorYear)} id="start" name="start"
                min={date} max={macDateMedicine}
                value={date} onChange={(event) => setDate(event.target.value)} />
            <label htmlFor="ward">Oddział szpitalny:</label>
            <select className="field" name="ward" id="ward" value={ward} onChange={(event) => setWard(event.target.value)}>
                {allWard.map((ward, index) => {
                    return <option key={index} >{ward}</option>
                })}
            </select>
            <input type="submit" />
        </form>
    )
}