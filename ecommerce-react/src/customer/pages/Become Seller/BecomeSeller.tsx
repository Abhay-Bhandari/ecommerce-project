import React, { useState } from "react";
import SellerLoginForm from "./SellerLoginForm";
import SellerAccountForm from "./SellerAccountForm";
import { Button } from "@mui/material";

function BecomeSeller() {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg">
        {isLogin ? <SellerLoginForm /> : <SellerAccountForm />}
        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">Have Account</h1>
          <Button
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
            onClick={handleShowPage}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-lg text-primary-color">Boost Your Sales</p>
          </div>

          <div>
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default BecomeSeller;
