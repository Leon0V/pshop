import { useState } from 'react';
import api from '../../services/api';


export default function Register() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvc, setCvc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleCardNumberChange(event) {
        let input = event.target.value.replace(/\D/g, '');
        input = input.substring(0, 16);
        input = input.replace(/(\d{4})(?=\d)/g, '$1-');
        setCardNumber(input);
    }

    function handleCvcChange(event) {
        let input = event.target.value.replace(/\D/g, '');
        input = input.substring(0, 3);
        setCvc(input);
    }

    function handleCardHolderChange(event) {
        let input = event.target.value.substring(0, 25);
        setCardHolder(input);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        let input = event.target.value;
        let inputValue = input.slice(0, 20).trim();
        setPassword(inputValue);
    }
    function handleSubmit(event) {
        event.preventDefault();

        const bodyParam = {
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            complement: complement,
            city: city,
            state: state,
            country: country,
            cardNumber: cardNumber,
            cardHolder: cardHolder,
            cvc: cvc,
            email: email,
            password: password
        }

        api.post('/register', bodyParam)
            .then((response) => {
                console.log(response.data)
                alert("User " + response.data.userId + " has been successfully registered!")
            })
            .catch((err) => {
                console.error(err)
                alert("An error occurred! Please check the console.")
            })
            .finally(() => {
                setName("")
                setPhoneNumber("")
                setAddress("")
                setComplement("")
                setCity("")
                setState("")
                setCountry("")
                setCardNumber("")
                setCardHolder("")
                setCvc("")
                setEmail("")
                setPassword("")
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ maxWidth: '75%', margin: 'auto' }}>
            <form>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" value={name} onChange={event => setName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneInput" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="phoneInput" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressInput" value={address} onChange={event => setAddress(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="complementInput" className="form-label">Complement</label>
                    <input type="text" className="form-control" id="complementInput" value={complement} onChange={event => setComplement(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label">City</label>
                    <input type="text" className="form-control" id="cityInput" value={city} onChange={event => setCity(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="stateInput" className="form-label">State</label>
                    <input type="text" className="form-control" id="stateInput" value={state} onChange={event => setState(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="countryInput" className="form-label">Country</label>
                    <input type="text" className="form-control" id="countryInput" value={country} onChange={event => setCountry(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNumberInput" className="form-label">Card Number</label>
                    <input type="text" className="form-control" id="cardNumberInput" value={cardNumber} onChange={handleCardNumberChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardHolderInput" className="form-label">Card Holder</label>
                    <input type="text" className="form-control" id="cardHolderInput" value={cardHolder} onChange={handleCardHolderChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cvcInput" className="form-label">CVC</label>
                    <input type="text" className="form-control" id="cvcInput" value={cvc} onChange={handleCvcChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailInput" value={email} onChange={handleEmailChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
