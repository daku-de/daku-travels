export default function UserBusinessObjects({ params }: { params: { location: string } }) {
    // todo: check if location exists --> if not redirect to edit
    return <div>{params.location}</div>;
}
