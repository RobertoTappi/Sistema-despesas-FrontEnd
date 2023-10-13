import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
    const testResult = zxcvbn(password);

    let num = (testResult.score * 100 / 4)

    if ((testResult.score * 100 / 4) === 0) {
        num = 25
    } else {
        num = testResult.score * 100 / 4
    }

    const createPassLabel = () => {
        if (password.length > 0) {
            switch (testResult.score) {
                case 0:
                    return 'Fraca';
                case 1:
                    return 'Fraca';
                case 2:
                    return 'Ok';
                case 3:
                    return 'Forte';
                case 4:
                    return 'Muito forte';
                default:
                    return '';
            }
        }
    }

    const funcProgressColor = () => {
        if (password.length > 0) {
            switch (testResult.score) {
                case 0:
                    return '#EA1111';
                case 1:
                    return '#EA1111';
                case 2:
                    return '#FFAD00';
                case 3:
                    return '#9bc158';
                case 4:
                    return '#00b500';
                default:
                    return 'gray';
            }
        }
    }


    const changePasswordColor = () => {
        console.log(num)
        const width = `${num}%`
        const background = funcProgressColor();

        if (password.length > 0) {
            return {
                width,
                background,
                height: '7px',
            }
        }
    }

    const passwordStyle = changePasswordColor()

    return (
        <>
            <div className="progress">
                <div className="progress-bar" style={passwordStyle}></div>
            </div>
            <p style={{ margin: '0px', color: funcProgressColor() }}>{createPassLabel()}</p>
        </>
    )
}

export default PasswordStrengthMeter