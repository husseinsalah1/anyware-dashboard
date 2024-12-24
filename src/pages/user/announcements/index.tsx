import CardAnnouncement from "./CardAnnouncement";
import Loading from "../../../components/loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAnnouncements } from "../../../redux/slice/announcement.slice";

const Announcements = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { announcements, loading } = useSelector(
    (state: RootState) => state.announcements
  );
  useEffect(() => {
    if (!loading && announcements.length === 0) {
      dispatch(fetchAnnouncements());
    }
  }, [dispatch, loading, announcements.length]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {announcements?.map((announcement, index) => (
        <CardAnnouncement
          key={index}
          _id={announcement._id}
          title={announcement.title}
          description={announcement.description}
          createdBy={announcement.createdBy}
          createdAt={announcement.createdAt}
        />
      ))}
    </div>
  );
};

export default Announcements;
