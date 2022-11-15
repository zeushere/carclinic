package pl.edu.ur.roda.carclinic.mapper;

import org.mapstruct.Mapper;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.entity.User;

@Mapper(componentModel = "spring")
public interface UserInfoDtoUserMapper {
    UserInfoDto userToUserInfoDto(User user);
}
