import React, { useState, useEffect } from "react";
import { Box, Button, Drawer, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(document.body.classList.contains("light-theme") ? false : true);

  // Listen for theme changes (when Navbar toggles the theme)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.body.classList.contains("light-theme"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, username, password);
        alert("Login successful!");
      } else {
        await createUserWithEmailAndPassword(auth, username, password);
        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: isDark ? "#181a20" : "#f3f4f6",
        transition: "background-color 0.3s"
      }}
    >
      {/* Sidebar Toggle Button */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          color: isDark ? "#fff" : "primary.main"
        }}
        color="primary"
      >
      </IconButton>

      {/* Drawer Sidebar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: 2, bgcolor: isDark ? "#23272f" : "#fff" }}>
          <Toolbar />
          <Button fullWidth component={Link} to="/Home" onClick={toggleDrawer(false)}>Home</Button>
          <Button fullWidth component={Link} to="/RegisterNow" onClick={toggleDrawer(false)}>Register</Button>
          <Button fullWidth component={Link} to="/Contact" onClick={toggleDrawer(false)}>Contact</Button>
          {user && (
            <Button
              fullWidth
              onClick={() => {
                handleLogout();
                toggleDrawer(false)();
              }}
              sx={{ mt: 2, backgroundColor: "red", color: "white" }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: isDark ? "#23272f" : "#fff",
            color: isDark ? "#fff" : "#222",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: 400,
            transition: "background-color 0.3s, color 0.3s"
          }}
        >
          {user ? (
            <Box textAlign="center">
              <h2>Welcome, {user.email}!</h2>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
                {isLogin ? "Login" : "Register"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "4px",
                      borderRadius: "4px",
                      border: isDark ? "1px solid #444" : "1px solid #ccc",
                      background: isDark ? "#181a20" : "#fff",
                      color: isDark ? "#fff" : "#222"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "4px",
                      borderRadius: "4px",
                      border: isDark ? "1px solid #444" : "1px solid #ccc",
                      background: isDark ? "#181a20" : "#fff",
                      color: isDark ? "#fff" : "#222"
                    }}
                  />
                </div>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  {isLogin ? "Login" : "Register"}
                </Button>
              </form>
              <p style={{ marginTop: "1rem", textAlign: "center" }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Register" : "Login"}
                </Button>
              </p>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginRegister;
