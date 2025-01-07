function HeaderRightContent({ showCartOnly = false }) {
  // ...existing code...

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)} 
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
        </Button>
        <UserCartWrapper 
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* Hide auth menu in mobile cart-only view */}
      {!showCartOnly && (
        // ...existing auth menu code...
      )}
    </div>
  );
}
