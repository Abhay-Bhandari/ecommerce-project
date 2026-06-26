import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCart from "../Cart/PricingCart";
import { ImageAspectRatio } from "@mui/icons-material";

function Checkout() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = React.useState("RAZORPAY");

  const handlePaymentChange = (event: any) => {
    setPaymentGateway(event.target.value);
  };

  const paymentGatewayList = [
    {
      value: "RAZORPAY",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBbu6ZGqKq8sVQDjU90HGXZ2wNKhTid5JPA&s",
      label: "",
    },
    {
      value: "STRIPE",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png",
      label: "",
    },
  ];

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44  lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {[1, 1, 1, 1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
              </div>
            </div>

            <div className="py-4 px-5 rounded-md border ">
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
          </div>
          <div className="border h-[40vh] border-gray-200 rounded-md">
            <div>
              <div className="space-y-3  p-5 rounded-md">
                <h1 className="text-primary-color font-medium pb-2 text-xl text-center">
                  Choose Payment Method
                </h1>
                <RadioGroup
                  row
                  aria-label="delivery"
                  name="delivery"
                  className="flex  justify-between pr-0"
                  onChange={handlePaymentChange}
                  value={paymentGatewayList}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      className="w-[40%] pr-2 rounded-md flex justify-center"
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          className={`${item.value == "stripe" ? "w-14" : ""}object-contain`}
                          src={item.image}
                          alt={item.label}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <Divider></Divider>
            <PricingCart />
            <div className="p-5">
              <Button fullWidth variant="contained" sx={{ py: "11px" }}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
}

export default Checkout;
