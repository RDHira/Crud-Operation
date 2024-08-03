import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import EditComponent from "./components/EditComponent";
import ProfilePage from "./components/ProfilePage";
import TableComponent from "./components/TableComponent";
import AddComponent from "./components/AddComponent";

const App = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [countries, setCountries] = useState([]);
  const [title, setTitle] = useState("CRUD Application");

  // Load data
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  // Fetch countries
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleAddRecord = (record) => {
    setData([...data, record]);
  };

  const handleDeleteRecord = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleEditRecord = (index, updatedRecord) => {
    const updatedData = data.map((record, i) =>
      i === index ? updatedRecord : record
    );
    setData(updatedData);
    setEditingIndex(null);
    setTitle("CRUD Application");
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTitle("Update CRUD Application");
  };

  const handleSaveEdit = (updatedRecord) => {
    handleEditRecord(editingIndex, updatedRecord);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setTitle("CRUD Application");
  };

  return (
    <Router>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Routes>
          <Route
            path="/"
            element={
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      {editingIndex === null ? (
                        <AddComponent onAddRecord={handleAddRecord} />
                      ) : (
                        <EditComponent
                          record={data[editingIndex]}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          countries={countries}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link to="/profiles">
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        style={{ margin: "10px" }}
                        onClick={() => setTitle("View CRUD Application")}
                      >
                        View All Profiles
                      </Button>
                    </Link>
                  </div>
                  <TableComponent
                    data={data}
                    onDelete={handleDeleteRecord}
                    onEdit={handleEditClick}
                  />
                </Grid>
              </Grid>
            }
          />
          <Route path="/profiles" element={<ProfilePage data={data} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
