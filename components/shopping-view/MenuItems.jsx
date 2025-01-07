function MenuItems({ closeSheet }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter = getCurrentMenuItem.id !== "home" && 
      getCurrentMenuItem.id !== "products" && 
      getCurrentMenuItem.id !== "search" 
      ? {
          category: [getCurrentMenuItem.id],
        }
      : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);

    // Close sheet after navigation
    if (closeSheet) {
      closeSheet();
    }
  }

  // ...rest of MenuItems code...
}
