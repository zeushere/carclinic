package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ur.roda.carclinic.entity.Role;

import java.util.Optional;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, String> {

    boolean existsByName(String name);

    Optional<Role> findByName(String name);

    Set<Role> findAllByNameIsIn(Set<String> roleNames);
}
