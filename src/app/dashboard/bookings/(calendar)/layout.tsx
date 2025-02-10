export default function CalendarLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {

  return (
    <>
        {props.children}
        {props.modal}
        <div id="modal-root" />
    </>
  );
}
