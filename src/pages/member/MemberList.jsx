import { useEffect, useState } from "react";
import { getMemberList } from "./memberApi";

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMemberList()
      .then((res) => {
        console.log("응답 데이터 👉", res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("에러 👉", err);
      });
  }, []);

  return (
    <div>
      <h2>회원 목록</h2>
      <ul>
        {members.map((member) => (
          <li key={member.member_no}>
            {member.member_id} / {member.member_name} / {member.member_email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
