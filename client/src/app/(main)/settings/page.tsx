"use client";

import Header from "@/components/Header";
import { useGetAuthUserQuery } from "@/state/api";
import React from "react";

const Settings = () => {
  const { data: user, isLoading, error } = useGetAuthUserQuery();

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  if (isLoading) {
    return (
      <div className="p-8 text-gray-500 dark:text-gray-400">Loading...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">Failed to load user data.</div>;
  }

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{user?.username || "-"}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{user?.email || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
