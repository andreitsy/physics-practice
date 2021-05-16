import sympy
from sympy import Expr
from sympy import simplify, trigsimp, sympify, SympifyError
from sympy.parsing.latex import parse_latex, LaTeXParsingError
from typing import Union

numeric = Union[int, float, complex, sympy.Number]


def compare_solutions(solution_1: Union[Expr, numeric],
                      solution_2: Union[Expr, numeric]) -> bool:
    """
    Try to simplify via different methods in lazy way

    :param solution_1:
    :param solution_2:
    :return: True if both expression are equivalent
    """

    if isinstance(solution_1, Expr) and isinstance(solution_2, Expr):
        return bool(simplify(solution_1 - solution_2) == 0) or \
               bool(trigsimp(solution_1 - solution_2) == 0) or \
               bool(simplify(solution_1.expand() - solution_2.expand()) == 0)
    else:
        return solution_1 == solution_2


def parse_expr(solution: str) -> Expr:
    """
    Parse string with solution
    :param solution string in latex form
    :return: expr
    """
    try:
        expression = sympify(solution)
    except SympifyError:
        return parse_latex(solution)
    else:
        return expression


def convert_expr_to_str(expression: Expr) -> str:
    """
    Convert solution to str to keep in database
    :param expression:
    :return: str
    """
    return str(sympify(expression))
