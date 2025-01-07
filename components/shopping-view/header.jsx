function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img src={logo} alt="Nature Spicy Logo" className="h-20 w-auto" />
        </Link>

        {/* Mobile Cart & Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <HeaderRightContent showCartOnly={true} /> {/* Add prop to only show cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems closeSheet={() => setOpen(false)} /> {/* Add closeSheet prop */}
              <HeaderRightContent showCartOnly={false} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent showCartOnly={false} />
        </div>
      </div>
    </header>
  );
}
