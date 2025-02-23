import LocationAutocomplete from "./LocationAutocomplete";
import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Slider,
  FormGroup,
  Switch,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [multiCountry, setMultiCountry] = useState("one"); // One Country, Two, Multi
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tentative, setTentative] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState([2000, 5000]);
  const [interests, setInterests] = useState([]);
  const [considerNearby, setConsiderNearby] = useState(false);
  const [roadTrip, setRoadTrip] = useState(false); // Road Trip toggle
  const [vacationType, setVacationType] = useState("");
  const [accommodation, setAccommodation] = useState("mid-range");
  const [transport, setTransport] = useState([]);

  const interestOptions = [
    "Adventure",
    "Food",
    "Culture",
    "Nature",
    "Nightlife",
    "Shopping",
    "Relaxation",
    "Festivals",
    "Historical Sites",
    "Hiking",
    "Beaches",
  ];
  const transportOptions = [
    "Flights",
    "Trains",
    "Buses",
    "Rental Car",
    "Public Transport",
  ];
  const vacationTypes = [
    "Solo",
    "Honeymoon",
    "Family",
    "Business",
    "Backpacking",
    "Luxury",
  ];

  const handleInterestChange = (event) => {
    const value = event.target.value;
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleTransportChange = (mode, checked) => {
    if (checked) {
      setTransport([...transport, mode]);
    } else {
      setTransport(transport.filter((t) => t !== mode));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      departure,
      destination,
      multiCountry,
      startDate,
      endDate,
      tentative,
      travelers,
      budget,
      interests,
      considerNearby,
      roadTrip,
      vacationType,
      accommodation,
      transport,
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Plan Your Trip with AI ✈️</h1>
      <form onSubmit={handleSubmit}>
        {/* Departure Field using Nominatim Autocomplete */}
        <div style={{ margin: "16px 0", textAlign: "left" }}>
          <label>Where are you traveling from?</label>
          <LocationAutocomplete
            placeholder="Enter departure city"
            onSelect={(s) => setDeparture(s)}
          />
        </div>

        {/* Destination Field using Nominatim Autocomplete */}
        <div style={{ margin: "16px 0", textAlign: "left" }}>
          <label>Where do you want to go?</label>
          <LocationAutocomplete
            placeholder="Enter destination"
            onSelect={(s) => setDestination(s)}
          />
        </div>

        {/* Consider Nearby Destinations */}
        <FormControlLabel
          control={
            <Checkbox
              checked={considerNearby}
              onChange={(e) => setConsiderNearby(e.target.checked)}
            />
          }
          label="Consider Nearby Destinations?"
        />

        {/* Multi-Country */}
        <TextField
          select
          label="How many countries?"
          fullWidth
          margin="normal"
          value={multiCountry}
          onChange={(e) => setMultiCountry(e.target.value)}
        >
          <MenuItem value="one">One Country Only</MenuItem>
          <MenuItem value="two">Two Countries Max</MenuItem>
          <MenuItem value="multi">Multi-Country</MenuItem>
        </TextField>

        {/* Dates */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Start Date"
            />
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                // Only update if startDate exists and the selected date is NOT before it.
              if (startDate && date < startDate) {
                alert("End date cannot be before the start date.");
                return;
              }
              setEndDate(date);
            }}
            placeholderText="Select End Date"
            minDate={startDate}
          />
          </div>
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={tentative}
              onChange={(e) => setTentative(e.target.checked)}
            />
          }
          label="Tentative Dates?"
        />

        {/* Travelers */}
        <TextField
          label="Number of Travelers"
          type="number"
          fullWidth
          margin="normal"
          value={travelers}
          onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
          inputProps={{ min: 1 }}
        />

        {/* Budget */}
        <div style={{ marginTop: "16px" }}>
          <label>Budget Range ($ USD):</label>
          <Slider
            value={budget}
            onChange={(e, newValue) => setBudget(newValue)}
            valueLabelDisplay="auto"
            min={500}
            max={15000}
            step={500}
          />
        </div>

        {/* Type of Vacation */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Type of Vacation</InputLabel>
          <Select
            value={vacationType}
            onChange={(e) => setVacationType(e.target.value)}
          >
            {vacationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Road Trip Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={roadTrip}
              onChange={(e) => setRoadTrip(e.target.checked)}
            />
          }
          label="Would you like a road trip? (AI will suggest a route)"
        />

        {/* Interests */}
        <div style={{ marginTop: "16px", textAlign: "left" }}>
          <label>What are your interests?</label>
          <FormGroup row>
            {interestOptions.map((interest) => (
              <FormControlLabel
                key={interest}
                control={
                  <Checkbox
                    value={interest}
                    onChange={handleInterestChange}
                    checked={interests.includes(interest)}
                  />
                }
                label={interest}
              />
            ))}
          </FormGroup>
        </div>

        {/* Accommodation Preference */}
        <TextField
          select
          label="Accommodation Preference"
          fullWidth
          margin="normal"
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
        >
          <MenuItem value="luxury">Luxury ($$$)</MenuItem>
          <MenuItem value="mid-range">Mid-Range ($$)</MenuItem>
          <MenuItem value="budget">Budget ($)</MenuItem>
        </TextField>

        {/* Preferred Transport Options */}
        <div style={{ marginTop: "16px", textAlign: "left" }}>
          <label>Preferred Transport:</label>
          <FormGroup row>
            {transportOptions.map((mode) => (
              <FormControlLabel
                key={mode}
                control={
                  <Checkbox
                    checked={transport.includes(mode)}
                    onChange={(e) =>
                      handleTransportChange(mode, e.target.checked)
                    }
                  />
                }
                label={mode}
              />
            ))}
          </FormGroup>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Generate Itinerary
        </Button>
      </form>
    </div>
  );
}

export default App;