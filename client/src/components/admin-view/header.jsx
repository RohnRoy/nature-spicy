import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";






function AdminHeader() 
    {return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      <AlignJustify />
      <span className="sr-only">Toggle Menu</span>
    </Button>
    

    </header>}
    


export default AdminHeader;