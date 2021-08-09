import { Box, IconButton, Typography, Popover as PopoverMU } from "@material-ui/core"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import ShareIcon from "@material-ui/icons/Share";
import { FC } from "react";

// Component to extra info like a url to share
const Popover: FC<{pathName: string, handle: string}> = ({pathName, handle}) => {
    return (
        <PopupState variant="popover">
            {(popupState) => (
                <>
                    <IconButton {...bindTrigger(popupState)}>
                        <ShareIcon /> 
                    </IconButton>
                    <PopoverMU      
                        {...bindPopover(popupState)}              
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >
                        <Box p={2}>
                          <Typography variant="caption">Copy url to share</Typography>
                          <Typography>{`${window.location.hostname}/${pathName}/${handle}`}</Typography>
                        </Box>
                    </PopoverMU>
                </>
            )}
        </PopupState>
    )
}

export default Popover;