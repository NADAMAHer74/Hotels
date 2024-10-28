
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementadult_quantity,
  decrementadult_quantity,
  incrementkids_quantity,
  decrementkids_quantity,
  incrementchild_quantity,
  decrementchild_quantity,
  toggleAdditionalService,
  calculateTotalCost,
} from '../../../Reducers/packageSlice';
import { TourDetailApi } from '../../../APIs/TourDetailApi'; // Import the thunk from API file

const BookPackage = () => {
    const dispatch = useDispatch();
    const { adult_quantity, kids_quantity, child_quantity, additional_service_ids, totalCost, status, error } = useSelector(
      (state) => state.package
    );
  
    useEffect(() => {
      dispatch(calculateTotalCost());
    }, [adult_quantity, kids_quantity, child_quantity, additional_service_ids, dispatch]);
  
    const handleBookPackage = () => {
      const packageData = {
        adult_quantity,
        kids_quantity,
        child_quantity,
        additional_service_ids,
      };
      dispatch(TourDetailApi(packageData));
    };
  
    return (
      <div>
        <h2>Package Details</h2>
  
        {/* Date Selection */}
        <label>Date</label>
        <input type="date" />
  
        {/* Time Selection */}
        <label>Time</label>
        <select>
          <option>Default sorting</option>
          {/* Add more time options as necessary */}
        </select>
  
        {/* Number of adult_quantity */}
        <div>
          <h4>adult_quantity (18+ years)</h4>
          <button onClick={() => dispatch(decrementadult_quantity())}>-</button>
          <span>{adult_quantity}</span>
          <button onClick={() => dispatch(incrementadult_quantity())}>+</button>
        </div>
  
        {/* Number of kids_quantity */}
        <div>
          <h4>kids_quantity (13 years)</h4>
          <button onClick={() => dispatch(decrementkids_quantity())}>-</button>
          <span>{kids_quantity}</span>
          <button onClick={() => dispatch(incrementkids_quantity())}>+</button>
        </div>
  
        {/* Number of child_quantity */}
        <div>
          <h4>child_quantity (5+ years)</h4>
          <button onClick={() => dispatch(decrementchild_quantity())}>-</button>
          <span>{child_quantity}</span>
          <button onClick={() => dispatch(incrementchild_quantity())}>+</button>
        </div>
  
        {/* Additional Services */}
        <div>
          <h4>Additional Service</h4>
          <label>
            <input
              type="checkbox"
              checked={additional_service_ids.includes('Additional Guide')}
              onChange={() => dispatch(toggleAdditionalService('Additional Guide'))}
            />
            Additional Guide $420
          </label>
          <label>
            <input
              type="checkbox"
              checked={additional_service_ids.includes('Internet')}
              onChange={() => dispatch(toggleAdditionalService('Internet'))}
            />
            Internet $420
          </label>
          <label>
            <input
              type="checkbox"
              checked={additional_service_ids.includes('Photography')}
              onChange={() => dispatch(toggleAdditionalService('Photography'))}
            />
            Photography $420
          </label>
        </div>
  
        {/* Total Cost */}
        <h4>
          Total Cost: <span>{totalCost.toFixed(2)}</span> / per person
        </h4>
  
        {/* Display any errors */}
        {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
  
        {/* Success Message */}
        {status === 'succeeded' && <p style={{ color: 'green' }}>Package booked successfully!</p>}
  
        {/* Book Button */}
        <button onClick={handleBookPackage} disabled={status === 'loading'}>
          {status === 'loading' ? 'Booking...' : 'Proceed To Book'}
        </button>
      </div>
    );
  };
  
  export default BookPackage;