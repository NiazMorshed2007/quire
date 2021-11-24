import React, { FC, useContext } from "react";
import { IbaseInfo } from "../interfaces/IbaseInfo";
import { User } from "../context/user";
import {
  FaGoogleDrive,
  FiMail,
  ImAttachment,
  MdOutlineModeEditOutline,
} from "react-icons/all";
import { Link } from "react-router-dom";

const BaseInfo: FC<IbaseInfo> = ({
  type,
  path,
  title,
  background,
  avatarTxt,
  parent_name,
}) => {
  const { user }: any = useContext(User);
  return (
    <div
      className={`base-info d-flex gap-3 ${type === "ORG" && "org_base-info"} ${
        type === "PRJ" && "prj_base-info"
      }`}
    >
      <div
        className={`avatar-wrapper ${
          type === "USER" && "user"
        } d-flex align-items-center justify-content-center overflow-hidden`}
      >
        {type === "USER" ? (
          <img src={user.user.photoURL} className="fitimage" alt="" />
        ) : (
          <div
            className="avatar w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: background }}
          >
            <h1>{avatarTxt}</h1>
          </div>
        )}
      </div>
      <div className="content-wrapper">
        <div className="up d-flex justify-content-between text-silver">
          <h5 className="category pt-1 uppercase">
            {type === "ORG" && "Organization"}
            {type === "USER" && "user"}
            {type === "PRJ" && "project"}
          </h5>
          <i className="pointer">
            <MdOutlineModeEditOutline />
          </i>
        </div>
        <h1 className="m-0">{title}</h1>
        <p className="m-0 pt-1 text-silver d-flex gap-3">
          {type === "PRJ" && (
            <Link
              to={`/w/o/${path}/overview`}
              className="text-decoration-none primary-color pointer"
            >
              {parent_name}
            </Link>
          )}
          <span className="joined-created">Joined on Oct 25, 2021</span>
        </p>
        {type === "USER" && (
          <p className="m-0 mt-2 mail d-flex gap-2 align-items-center">
            <FiMail className="text-silver" />
            <span>{user.user.email}</span>
          </p>
        )}
        {type === "PRJ" && (
          <div className="attachment-wrapper bg-silver mt-3">
            <div className="atachment-header d-flex gap-3 text-silver">
              <ImAttachment />
              <FaGoogleDrive />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseInfo;
