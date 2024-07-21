import React from "react";
import { motion } from "framer-motion";

const ProfileCard = ({ name, role, github }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 flex flex-col items-center bg-primarylight bg-opacity-75 rounded-lg shadow-md"
  >
    <img
      src={`${github}.png`}
      alt={`${name}'s GitHub`}
      className="w-24 h-24 rounded-full"
    />
    <h3 className="mt-4 text-lg font-semibold text-primarycontent font-UnageoBold">
      {name}
    </h3>
    <p className="text-secondarycontent font-UnageoRegular">{role}</p>
  </motion.div>
);

export default ProfileCard;
