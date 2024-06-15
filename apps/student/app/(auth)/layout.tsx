import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const Authlayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-200 p-10 rounded-md border-none">{children}</div>
  );
};

export default Authlayout;
