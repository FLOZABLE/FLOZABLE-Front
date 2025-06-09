import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

type ShowPasswordBtnProps = {
  isShowPassword: boolean;
  setIsShowPassword: (value: boolean) => void;
  className?: string;
};

export default function ShowPasswordBtn({
  isShowPassword,
  setIsShowPassword,
  className,
  ...props
}: ShowPasswordBtnProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsShowPassword(!isShowPassword);
      }}
      aria-label={isShowPassword ? "Hide password" : "Show password"}
      className={cn(
        "p-2 text-gray-500 transition hover:text-black focus:outline-none",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isShowPassword ? "eye" : "eyeSlash"}
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block"
        >
          <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
