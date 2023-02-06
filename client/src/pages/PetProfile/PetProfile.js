import * as dayjs from "dayjs";

function PetProfile(props) {
  const birthday = dayjs(props.pet.birthday).format("MM/DD/YYYY");
  const now = dayjs().format("YYYY-MM-DD");
  return (
    <>
      <div className="modal-body">
        <div className="flex-body">
          {/* profile picture SAME ON MODAL BUTTON BELOW*/}
          <div className="profile-posts-picture">
            <img src={props.pet.picturesURL}></img>
          </div>
          {/* contents to fetch to? */}
          <div className="profile-posts-center">
            <h1>{props.pet.name}</h1>
            <h4>species: {props.pet.species}</h4>
            <h4>birthday: {birthday}</h4>
            <h4>age: {dayjs(now).diff(dayjs(props.pet.birthday), "year")}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetProfile;
