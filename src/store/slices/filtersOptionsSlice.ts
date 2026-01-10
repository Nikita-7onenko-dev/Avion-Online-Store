import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

const initialState: FiltersOptionsType = {
  filters: { productTypes: [], category: [], designers: [], priceFilters: [] },
  sorting: '',
  search: ''
}

const filtersOptionsSlice = createSlice({
  name: 'filtersOptions',
  initialState,
  reducers: {
    toggleFilters(state, action: PayloadAction<{name: string, value: string}>) {
      const {name, value} = action.payload;
      const targetArr = state.filters[name as keyof typeof state.filters];
      const isActive = targetArr.includes(value);

      if(isActive) {
        state.filters[name as keyof typeof state.filters] = targetArr.filter(filterName => filterName !== value);
      } else { 
        targetArr.push(value);
      }

      if(targetArr.length > 1) {
        targetArr.sort();
      }
    },

    toggleSorting(state, action:PayloadAction<string>) {
      state.sorting = action.payload as typeof state.sorting;
    },

    applySearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    resetFiltersAction() {
      return initialState;
    },

    setFiltersOptions(_, action: PayloadAction<FiltersOptionsType>) {
      return action.payload;
    },
  }
})

export const {
  toggleFilters,
  toggleSorting, 
  applySearch, 
  resetFiltersAction,
  setFiltersOptions
} = filtersOptionsSlice.actions;
export const filtersOptionsReducer = filtersOptionsSlice.reducer;