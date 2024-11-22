"use client";

import "@/styles/navbar/styles.css";
import { fetchLogout } from "@/api/auth/logout";
import { fetchProfile } from "@/api/auth/profile";
import { useEffect, useRef, useState } from "react";
import { User } from "@/constants/type/user";
import { CircularProgress } from "@mui/material";

export default function Navbar() {
  const lastScrollTop = useRef(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const [dataUser, setDataUser] = useState({});
  const [hasUser, setHasUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const { pageYOffset } = window;
        if (pageYOffset > lastScrollTop.current) {
          // downward scroll
          setIsNavbarVisible(false);
        } else if (pageYOffset < lastScrollTop.current) {
          // upward scroll
          setIsNavbarVisible(true);
        } // else was horizontal scroll
        lastScrollTop.current = pageYOffset <= 0 ? 0 : pageYOffset;
      },
      { passive: true }
    );

    // fetch profile
    fetchProfile()
      .then((result) => {
        if (result.status === "SUCCESS") {
          setHasUser(true);
          setDataUser(result.result!.profile);
        }
      })
      .catch(() => {
        setHasUser(false);
        setDataUser({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetchLogout();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`${isNavbarVisible ? "visible" : ""}`}>
      {isLoading ? (
        <>
          <CircularProgress color="success" />
        </>
      ) : (
        <>
          <p>{hasUser ? dataUser?.name : "Guest"}</p>
          <div className="nav-items">
            {hasUser ? (
              <a onClick={handleLogout}>Logout</a>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
