package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);
    boolean existsByLogin(String login);
    Optional<User> findByLogin(String login);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndLogin(String email, String login);
}
