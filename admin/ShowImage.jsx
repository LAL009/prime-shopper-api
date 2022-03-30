import { baseUrl } from "./HttpPostRequest";


const ShowImage = props => {

    const { property, record, onChange } = props

    var image = props.record.params[property.name];

    if (image && image.match('http') == null) {
        image = baseUrl + image;
    }

    if (!image) {
        return <div>--</div>
    }

    return (
        <div>
            <img style={{ height: 'auto', width: 100 }} src={image} alt=" Image" />
        </div>

    );
}
export default ShowImage;