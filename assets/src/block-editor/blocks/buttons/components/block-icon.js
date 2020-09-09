/**
 * Block Icon component.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const BlockIcon = () => (
	<span className="material-icons__button">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="24" height="24" fill="white" />
			<path
				d="M19 7H5C3.9 7 3 7.9 3 9V15C3 16.1 3.9 17 5 17H19C20.1 17 21 16.1 21 15V9C21 7.9 20.1 7 19 7ZM19 15H5V9H19V15Z"
				fill="#512DA8"
			/>
			<path d="M16 11H8V13H16V11Z" fill="#512DA8" />
		</svg>
	</span>
);

export default BlockIcon;
