import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setuploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: "Product added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add product.",
          variant: "destructive",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => setOpenCreateProductsDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setuploadedImageUrl={setuploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText="Add"
                formControls={addProductFormElements}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
