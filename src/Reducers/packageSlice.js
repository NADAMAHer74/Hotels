import { createSlice } from "@reduxjs/toolkit";
import { TourDetailApi } from "../APIs/TourDetailApi";

const initialState = {
  adult_quantity: 1,
  kids_quantity: 0,
  child_quantity: 0,
  additional_service_ids: [],
  totalCost: 0.00,
  adultPrice: 0,
  kidsPrice: 0,
  childrenPrice: 0,
  location: "",
  name: "",
  languagesSupport: "",
  maxGusts:1,
  miniAge: 1,
  // status: "idle",
  // error: null,
};

// const packageSlice = createSlice({
//   name: "package",
//   initialState,
//   reducers: {
  const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
      setPrices: (state, action) => {
        const { adultPrice, kidsPrice, childrenPrice } = action.payload;
        state.adultPrice = adultPrice;
        state.kidsPrice = kidsPrice;
        state.childrenPrice = childrenPrice;
      },
    incrementadult_quantity: (state) => {
      state.adult_quantity += 1;
      packageSlice.caseReducers.calculateTotalCost(state);
    },
    decrementadult_quantity: (state) => {
      if (state.adult_quantity > 1) {
        state.adult_quantity -= 1;
        packageSlice.caseReducers.calculateTotalCost(state);
      }
    },
    incrementkids_quantity: (state) => {
      state.kids_quantity += 1;
      packageSlice.caseReducers.calculateTotalCost(state);
    },
    decrementkids_quantity: (state) => {
      if (state.kids_quantity > 0) {
        state.kids_quantity -= 1;
        packageSlice.caseReducers.calculateTotalCost(state);
      }
    },
    incrementchild_quantity: (state) => {
      state.child_quantity += 1;
      packageSlice.caseReducers.calculateTotalCost(state);
    },
    decrementchild_quantity: (state) => {
      if (state.child_quantity > 0) {
        state.child_quantity -= 1;
        packageSlice.caseReducers.calculateTotalCost(state);
      }
    },
    toggleAdditionalService: (state, action) => {
      const service = action.payload;
      if (state.additional_service_ids.includes(service)) {
        state.additional_service_ids = state.additional_service_ids.filter(
          (item) => item !== service
        );
      } else {
        state.additional_service_ids.push(service);
      }
      packageSlice.caseReducers.calculateTotalCost(state);
    },
    calculateTotalCost: (state) => {
      const { adult_quantity, kids_quantity, child_quantity, adultPrice, kidsPrice, childrenPrice } = state;
      const serviceCost = 420; 
      console.log(`Calculating Total Cost: Adult Price: ${adultPrice}, Kids Price: ${kidsPrice}, Children Price: ${childrenPrice}`); // Log for debugging
      state.totalCost =
        adult_quantity * adultPrice +
        kids_quantity * kidsPrice +
        child_quantity * childrenPrice +
        state.additional_service_ids.length * serviceCost;
      // console.log(`Total Cost Calculated: ${state.totalCost}`); // Log for debugging
    },
    resetBookingState: (state) => {
      state.adult_quantity = 1;
      state.kids_quantity = 0;
      state.child_quantity = 0;
      state.additional_service_ids = [];
      state.totalCost = 0;
    },
  },
    
  
  extraReducers: (builder) => {
    builder
      .addCase(TourDetailApi.pending, (state) => {
        state.status = "loading";
      })
          .addCase(TourDetailApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            const { adultPrice, kidsPrice, childrenPrice } = action.payload;
            state.adultPrice = adultPrice;
            state.kidsPrice = kidsPrice;
            state.childrenPrice = childrenPrice;
            packageSlice.caseReducers.calculateTotalCost(state); // Initialize totalCost
          })
      .addCase(TourDetailApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  incrementadult_quantity,
  decrementadult_quantity,
  incrementkids_quantity,
  decrementkids_quantity,
  incrementchild_quantity,
  decrementchild_quantity,
  toggleAdditionalService,
  calculateTotalCost,
  setPrices,
  name,
  languagesSupport,
  maxGusts,
  miniAge,
  location,
  resetBookingState,
} = packageSlice.actions;

export default packageSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';
// import { TourDetailApi } from '../APIs/TourDetailApi'; // Import the thunk from API file

// const initialState = {
//   adult_quantity: 1,
//   kids_quantity: 1,
//   child_quantity: 1,
//   additional_service_ids: [],
//   totalCost: 0,
//   status: 'idle', 
//   error: null,
// };

// const packageSlice = createSlice({
//   name: 'package',
//   initialState,
//   reducers: {
//     incrementadult_quantity: (state) => {
//       state.adult_quantity += 1;
//     },
//     decrementadult_quantity: (state) => {
//       if (state.adult_quantity > 0) state.adult_quantity -= 1;
//     },
//     incrementkids_quantity: (state) => {
//       state.kids_quantity += 1;
//     },
//     decrementkids_quantity: (state) => {
//       if (state.kids_quantity > 0) state.kids_quantity -= 1;
//     },
//     incrementchild_quantity: (state) => {
//       state.child_quantity += 1;
//     },
//     decrementchild_quantity: (state) => {
//       if (state.child_quantity > 0) state.child_quantity -= 1;
//     },
//     toggleAdditionalService: (state, action) => {
//       const service = action.payload;
//       if (state.additional_service_ids.includes(service)) {
//         state.additional_service_ids = state.additional_service_ids.filter(
//           (item) => item !== service
//         );
//       } else {
//         state.additional_service_ids.push(service);
//       }
//     },
//     calculateTotalCost: (state) => {
//       const baseCost = 800; // Base cost per person
//       const serviceCost = 420; // Cost per additional service
//       state.totalCost =
//         (state.adult_quantity + state.kids_quantity + state.child_quantity) * baseCost +
//         state.additional_service_ids.length * serviceCost;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(TourDetailApi.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(TourDetailApi.fulfilled, (state) => {
//         state.status = 'succeeded';
//       })
//       .addCase(TourDetailApi.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   incrementadult_quantity,
//   decrementadult_quantity,
//   incrementkids_quantity,
//   decrementkids_quantity,
//   incrementchild_quantity,
//   decrementchild_quantity,
//   toggleAdditionalService,
//   calculateTotalCost,
// } = packageSlice.actions;

// export default packageSlice.reducer;