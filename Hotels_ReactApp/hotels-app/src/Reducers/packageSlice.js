// import { createSlice } from "@reduxjs/toolkit";
// import { TourDetailApi } from "../APIs/TourDetailApi";

// const initialState = {
//   adult_quantity: 1,
//   kids_quantity: 0,
//   child_quantity: 0,
//   additional_service_ids: [],
//   totalCost: 0.0,
//   adultPrice: 0,
//   kidsPrice: 0,
//   childrenPrice: 0,
//   location: "",
//   name: "",
//   languagesSupport: "",
//   maxGusts: 1,
//   miniAge: 1,
//   // status: "idle",
//   // error: null,
// };

// // const packageSlice = createSlice({
// //   name: "package",
// //   initialState,
// //   reducers: {
// const packageSlice = createSlice({
//   name: "package",
//   initialState,
//   reducers: {
//     setPrices: (state, action) => {
//       const { adultPrice, kidsPrice, childrenPrice } = action.payload;
//       state.adultPrice = adultPrice;
//       state.kidsPrice = kidsPrice;
//       state.childrenPrice = childrenPrice;
//     },
//     incrementadult_quantity: (state) => {
//       state.adult_quantity += 1;
//       packageSlice.caseReducers.calculateTotalCost(state);
//     },
//     decrementadult_quantity: (state) => {
//       if (state.adult_quantity > 1) {
//         state.adult_quantity -= 1;
//         packageSlice.caseReducers.calculateTotalCost(state);
//       }
//     },
//     incrementkids_quantity: (state) => {
//       state.kids_quantity += 1;
//       packageSlice.caseReducers.calculateTotalCost(state);
//     },
//     decrementkids_quantity: (state) => {
//       if (state.kids_quantity > 0) {
//         state.kids_quantity -= 1;
//         packageSlice.caseReducers.calculateTotalCost(state);
//       }
//     },
//     incrementchild_quantity: (state) => {
//       state.child_quantity += 1;
//       packageSlice.caseReducers.calculateTotalCost(state);
//     },
//     decrementchild_quantity: (state) => {
//       if (state.child_quantity > 0) {
//         state.child_quantity -= 1;
//         packageSlice.caseReducers.calculateTotalCost(state);
//       }
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
//       packageSlice.caseReducers.calculateTotalCost(state);
//     },
//     calculateTotalCost: (state) => {
//       const {
//         adult_quantity,
//         kids_quantity,
//         child_quantity,
//         adultPrice,
//         kidsPrice,
//         childrenPrice,
//       } = state;
//       const serviceCost = 420;
//       console.log(
//         `Calculating Total Cost: Adult Price: ${adultPrice}, Kids Price: ${kidsPrice}, Children Price: ${childrenPrice}`
//       ); // Log for debugging
//       state.totalCost =
//         adult_quantity * adultPrice +
//         kids_quantity * kidsPrice +
//         child_quantity * childrenPrice +
//         state.additional_service_ids.length * serviceCost;
//       // console.log(`Total Cost Calculated: ${state.totalCost}`); // Log for debugging
//     },
//     resetBookingState: (state) => {
//       state.adult_quantity = 1;
//       state.kids_quantity = 0;
//       state.child_quantity = 0;
//       state.additional_service_ids = [];
//       state.totalCost = 0.0;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(TourDetailApi.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(TourDetailApi.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const { adultPrice, kidsPrice, childrenPrice } = action.payload;
//         state.adultPrice = adultPrice;
//         state.kidsPrice = kidsPrice;
//         state.childrenPrice = childrenPrice;
//         packageSlice.caseReducers.calculateTotalCost(state); // Initialize totalCost
//       })
//       .addCase(TourDetailApi.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
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
//   setPrices,
//   name,
//   languagesSupport,
//   maxGusts,
//   miniAge,
//   location,
//   resetBookingState,
// } = packageSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { TourDetailApi } from "../APIs/TourDetailApi";

const initialState = {
  adult_quantity: 1,
  kids_quantity: 0,
  child_quantity: 0,
  additional_service_ids: [],
  totalCost: 0.0,
  adultPrice: 0,
  kidsPrice: 0,
  childrenPrice: 0,
  location: "",
  name: "",
  languagesSupport: "",
  maxGusts: 1,
  miniAge: 1,
  // status: "idle",
  // error: null,
};
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
      const {
        adult_quantity,
        kids_quantity,
        child_quantity,
        adultPrice,
        kidsPrice,
        childrenPrice,
        additional_service_ids,
      } = state;

      console.log("adult before", adultPrice);
      // Ensure that prices are valid numbers before calculation
      const adultCost = adultPrice > 0 ? adultPrice : 0;
      const kidsCost = kidsPrice > 0 ? kidsPrice : 0;
      const childrenCost = childrenPrice > 0 ? childrenPrice : 0;
      const serviceCost = 420; // Cost of additional services per item selected
      console.log("adult after", adultCost);

      // Calculate total cost based on quantities and prices
      state.totalCost =
        adult_quantity * adultCost +
        kids_quantity * kidsCost +
        child_quantity * childrenCost +
        additional_service_ids.length * serviceCost;

      // Log for debugging
      console.log(
        `Calculating Total Cost: Adult Price: ${adultCost}, Kids Price: ${kidsCost}, Children Price: ${childrenCost}, Additional Services Count: ${additional_service_ids.length}`
      );
    },
    // Reset the state but keep adult price as the starting cost
    resetBookingState: (state) => {
      state.adult_quantity = 1;
      state.kids_quantity = 0;
      state.child_quantity = 0;
      state.additional_service_ids = [];
      state.totalCost = state.adultPrice; // Set totalCost to adultPrice as starting cost
      packageSlice.caseReducers.calculateTotalCost(state); // Recalculate total cost based on new state
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
        packageSlice.caseReducers.calculateTotalCost(state); // Initialize totalCost after fetching prices
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
  resetBookingState,
} = packageSlice.actions;

export default packageSlice.reducer;
