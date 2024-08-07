import React from "react";
import { MAX_MONTHS } from "../../utils/initCalculator";
import { Grid, Slider, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeMonths } from "../../redux/slices/calculator";
import InvestmentChart from "./InvestmentsChart/InvestmentsChart";
import GrothChart from "./GrowthChart/GrowthChart";

export default function PlotsWrapper() {
  const months = useAppSelector(store => store.calculator.months);
  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>  
        <InvestmentChart/>
      </Grid>
      <Grid item xs={6}>  
        <GrothChart/>
      </Grid>
      <Grid item xs={12}>        
        <Stack 
          spacing={2} 
          direction="row" 
          sx={{ m: 5 }} 
          alignItems="center"
        >
          <Slider 
            aria-label="Volume" 
            value={months} 
            onChange={(_, value) => {            
              const newValue = Array.isArray(value) ? value[0] : value;
              if (Number.isNaN(newValue)) return;
              dispatch(changeMonths(newValue));
            }} 
            max={MAX_MONTHS}
            marks={[
              {value: 0, label: '0'},
              {value: MAX_MONTHS, label: `${MAX_MONTHS}`},
              {value: months, label: `${months}`},
            ]}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}