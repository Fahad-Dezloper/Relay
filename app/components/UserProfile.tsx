import { auth } from "@/auth"

const UserProfile = async () => {
    const session = await auth();
    console.log(session);

  return (
    <div>
      {session && session.user ? (
        <div>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          <p>Role: {session.user.role}</p> {/* Display the selected role */}
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
};

export default UserProfile;
