import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const OffersModal = ({ children, isOpen, onClose, onSubmit }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="w-full h-full fixed bg-dark/90 z-10 inset-0 overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center min-h-screen"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.3 }}
            >
              <div
                dir="rtl"
                className="w-full max-w-lg mx-8 bg-white rounded-lg overflow-hidden flex flex-col items-center justify-between"
                style={{ maxHeight: "90vh" }}
              >
                <div
                  className="w-full h-100 overflow-y-scroll p-4"
                  style={{ overflowY: "scroll" }}
                >
                  {children}
                </div>
                <div className="w-full p-4 flex flex-row justify-center items-center">
                  {/* <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    style={{ maxWidth: "20vw" }}
                    onClick={onSubmit}
                    className="w-1/2 !bg-primary p-2 text-white mx-3 rounded-lg"
                  >
                    عايز ألاقي
                  </motion.button> */}
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    style={{ maxWidth: "20vw" }}
                    onClick={onClose}
                    className="w-1/2 !bg-white p-2 !text-primary mx-3 rounded-lg border !border-primary"
                  >
                    إلغاء
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default OffersModal;
