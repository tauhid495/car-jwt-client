import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';
// import axios from 'axios';


const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth)
    // const [user, setUser] = useState({
    //     name: 'Akbor The Great',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol road, Mohommodpur, dhaka',
    //     phone: '014411554215'
    // })

    // const handleAddressChange = event => {
    //     const { address, ...rest } = user;
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest }
    //     setUser(newUser);
    // }

    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            service: service.name,
            name: user.name,
            email: user.email,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('your order is placed')
                    e.target.reset();
                }
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please order : {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='Your name' required readOnly /> <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='Your email' required readOnly /> <br />
                <input className='w-100 mb-2 ' value={service.name} type="text" name='service' placeholder='Your service' required readOnly /> <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Your address' required /> <br />
                <input className='w-100 mb-2' type="number" name='phone' placeholder='Your phone' required /> <br />
                <input className='btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default Checkout;